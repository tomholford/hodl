export type GenericPropertiesForObject<
  T extends Record<K, { properties: { [k: string]: { value: any } } }>,
  K extends PropertyKey
  > = {
    [P in keyof T[K]["properties"]]: T[K]["properties"][P]["value"]
  };
