/// <reference path="../.astro/types.d.ts" />

type ENV = {
  XAI_API_KEY: string;
};

type Runtime = import("@astrojs/cloudflare").Runtime<ENV>;
declare namespace App {
  interface Locals extends Runtime { }
}