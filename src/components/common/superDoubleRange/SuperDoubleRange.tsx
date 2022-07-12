import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";
import { Slider } from "@mui/material";

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperDoubleRangePropsType = DefaultInputPropsType & {
  status: string;
  onChangeRange: (value_1: number, value_2: number) => void;
};

export const SuperDoubleRange: React.FC<SuperDoubleRangePropsType> = ({
  status,
  onChange,
  onChangeRange,
  className,
  ...restProps
}) => {
  const [values, setValues] = React.useState<number[]>([0, 110]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValues(newValue as number[]);
  };

  const handleClick = () => {
    onChangeRange(values[0], values[1]);
  };

  return (
    <>
      <Slider
        // getAriaLabel={() => "Temperature range"}
        value={values}
        onChange={handleChange}
        max={110}
        onMouseUp={handleClick}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        disabled={status === "loading"}
      />
    </>
  );
};
