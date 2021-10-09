import { useState } from 'react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  Textarea as ChakraTextarea,
  TextareaProps as ChakraTextareaProps,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface TextareaProps extends ChakraTextareaProps {
  name: string;
  error?: FieldError;
}

const TextareaBase: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  TextareaProps
> = ({ name, error = null, ...rest }, ref) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraTextarea
        id={name}
        name={name}
        variant="outline"
        size="lg"
        color="blue.900"
        focusBorderColor="blue.400"
        bg="white"
        height="340px"
        resize="none"
        ref={ref}
        {...rest}
      />
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Textarea = forwardRef(TextareaBase);
