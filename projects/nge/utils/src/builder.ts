import { deepCopy } from "./copy";

interface ClassInfo {
  resolver?: (props: Record<string, any>) => Function,
}

interface PropertyInfo {
  type?: Function,
  indexed?: boolean,
  aliases?: string[];
}

class Serializer {
  static serialize(instance: any): Record<string, any> {
    const record: Record<string, any> = {};
    const prototype = instance.constructor.prototype;
    const properties: Record<string, PropertyInfo> = prototype.__properties_infos__;

    Object.keys(properties).forEach(propertyName => {
      if (!(propertyName in instance)) {
        return;
      }

      const property = properties[propertyName];
      const exportName = (property.aliases ?? []).pop() ?? propertyName;

      const value = instance[propertyName];
      if (value == null) {
        return;
      }
      switch (typeof (value)) {
        case 'string':
        case 'number':
        case 'boolean':
          if (value != null) {
            record[exportName] = value;
          }
          break;
        case 'object':
          if (property.type) {
            if (Array.isArray(value)) {
              record[exportName] = value.map(e => {
                return Serializer.serialize(e);
              }).filter(e => e != null);
            } else if (property.indexed) {
              record[exportName] = Object.keys(value).reduce((obj, key) => {
                if (value[key] === undefined) {
                  return obj;
                }
                obj[key] = Serializer.serialize(value[key]);
                return obj;
              }, {} as Record<string, any>);
            } else {
              record[exportName] = Serializer.serialize(value);
            }
          } else {
            if (Array.isArray(value)) {
              record[exportName] = value.filter(obj => obj != null);
            } else {
              record[exportName] = deepCopy(value);
            }
          }
          break;
      }
    });
    return record;
  }

  static deserialize(target: any, props: Record<string, any>) {
    const record: Record<string, any> = {
      ...props
    };
    const prototype = target.prototype;
    const info: ClassInfo = prototype.__class_info__;
    if (info.resolver) {
      target = info.resolver(props);
    }

    const properties: Record<string, PropertyInfo> = prototype.__properties_infos__;
    Object.keys(properties).forEach(propertyName => {
      const property = properties[propertyName];
      const aliases = property.aliases ?? [];
      const value = props[propertyName] ?? Object.keys(props).find(k => {
        return !!aliases.find(alias => alias === k)
      });

      if (value == null) {
        return;
      }

      switch (typeof (value)) {
        case 'object':
          if (property.type) {
            if (Array.isArray(value)) {
              record[propertyName] = value.map(e => {
                return Serializer.deserialize(property.type, e);
              });
            } else if (property.indexed) {
              Object.keys(value).forEach(k => {
                value[k] = Serializer.deserialize(property.type, value[k]);
              });
              record[propertyName] = value;
            } else {
              record[propertyName] = Serializer.deserialize(property.type, value);
            }
          } else {
            record[propertyName] = value;
          }
          break;
        default:
          record[propertyName] = value;
          break;
      }
    });
    return new target(record);
  }
}

export class Builder<T> {
  /**
   * Creates new instance of `T` class.
   * @param props properties to pass to the constructor of the instance.
   * @returns new instance of `T`
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static create<T>(props: Partial<T>): T {
    throw new Error('This is an abstract method. It needs to be overridden.');
  }

  save(): Record<keyof T, any> {
    throw new Error('This is an abstract method. It needs to be overridden.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  with(props: Partial<T>): T {
    throw new Error('This is an abstract method. It needs to be overridden.');
  }
}

export function Entity(info?: ClassInfo): ClassDecorator {
  return function (target: any) {
    const prototype = target.prototype;
    info = info ?? {};
    prototype.__class_info__ = prototype.__class_info__ ?? info;
    prototype.__class_info__ = {
      ...prototype.__class_info__,
      ...info
    };

    prototype.save = function () {
      return Serializer.serialize(this);
    }

    prototype.with = function (props: any) {
      return new target({
        ...this,
        ...props
      });
    }

    target.create = function (props: Record<string, any>) {
      return Serializer.deserialize(target, props);
    }
    return target;
  }
}

export function Property(info?: PropertyInfo): PropertyDecorator {
  return (instance: any, name: string | symbol) => {
    info = info ?? {
      aliases: [],
    };

    const prototype = instance.constructor.prototype;
    prototype.__properties_infos__ = prototype.__properties_infos__ ?? {};
    prototype.__properties_infos__[name] = info;
  };
}

