import { LoggingHttpInterceptor } from './interceptors/logging-http-interceptor';
import { CoreService } from './core.service';

export const services: any[] = [
  LoggingHttpInterceptor,
  CoreService
];

export * from './interceptors/logging-http-interceptor';
export * from './core.service';
