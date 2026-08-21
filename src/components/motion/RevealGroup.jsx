import { Children } from 'react';
import { Reveal } from './Reveal.jsx';

export function RevealGroup({
  as = 'div',
  direction = 'fade-up',
  step = 0.08,
  className,
  children,
  ...rest
}) {
  const Tag = as;

  return (
    <Tag className={className} {...rest}>
      {Children.map(children, (child, index) => (
        <Reveal direction={direction} delay={index * step}>
          {child}
        </Reveal>
      ))}
    </Tag>
  );
}
