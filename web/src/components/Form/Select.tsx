import { forwardRef, ForwardRefRenderFunction } from 'react';
import { FieldError } from 'react-hook-form';
import {
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  FormControl,
} from '@chakra-ui/react';

type Options = { label: string; value: string };

interface SelectProps extends ChakraSelectProps {
  name: string;
  options: Options[];
  error?: FieldError;
}

const SelectBase: ForwardRefRenderFunction<HTMLSelectElement, SelectProps> = (
  { name, options, error = null, ...rest },
  ref,
) => {
  return (
    <FormControl isInvalid={!!error}>
      <ChakraSelect
        id={name}
        name={name}
        variant="outline"
        size="lg"
        color="blue.900"
        focusBorderColor="blue.400"
        bg="white"
        ref={ref}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </ChakraSelect>
    </FormControl>
  );
};

export const Select = forwardRef(SelectBase);
