import { createParamDecorator, ExecutionContext } from '@nestjs/common';

const requestIdDecorator = createParamDecorator(
  (_data: never, enhancer: ExecutionContext) => {
    const { id } = enhancer.switchToHttp().getRequest();

    return id;
  },
);
