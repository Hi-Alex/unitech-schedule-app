interface IProcessEnv {
  [key: string]: any;
  DEBUG: string;
  GQL_HOST: string;
  GQL_PORT: string;
  GQL_PROTOCOL: string;
  GQL_ENDPOINT: string;
}

declare namespace NodeJS {
  export interface Process {
    env: IProcessEnv;
  }
}

declare module "*.graphql" {
  const modules: any;

  export = modules;
}

declare module "*.scss" {
  const modules: any;

  export = modules;
}

declare module "*.css" {
  const modules: any;

  export = modules;
}

declare module "*.svg" {
  const modules: any;

  export = modules;
}

declare module "*.jpg" {
  const modules: any;

  export = modules;
}
