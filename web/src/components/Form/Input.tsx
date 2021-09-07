import { useState } from 'react';
import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
  Icon,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface InputProps extends ChakraInputProps {
  name: string;
  type: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, type, error = null, ...rest },
  ref,
) => {
  const isPassword = type === 'password';
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <FormControl isInvalid={!!error}>
      <InputGroup size="md">
        <ChakraInput
          id={name}
          name={name}
          variant="outline"
          size="lg"
          type={isPassword && show ? 'text' : type}
          color="blue.900"
          focusBorderColor="blue.400"
          bg="white"
          ref={ref}
          {...rest}
        />
        {isPassword && (
          <InputRightElement width="4.5rem" height="3rem">
            <Button size="sm" onClick={handleClick}>
              {show ? (
                <Icon as={AiOutlineEyeInvisible} color="blue.900" />
              ) : (
                <Icon as={AiOutlineEye} color="blue.900" />
              )}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
