import React from 'react';
// @ts-ignore
import { Space } from 'components/ui';
// @ts-ignore
import FormLayoutStyles from './FormLayout.module.css';

type Props = {
  align?: string;
  children?: any;
  className?: string;
  descriptionText?: string;
  error?: string;
  id?: string;
  label?: string;
  labelOptional?: string;
  layout?: 'horizontal' | 'vertical';
  style?: React.CSSProperties;
  flex?: boolean;
  responsive?: boolean;
  size?: 'tiny' | 'small' | 'medium' | 'large' | 'xlarge';
  beforeLabel?: string;
  afterLabel?: string;
};

export function FormLayout({
  align,
  children,
  className,
  descriptionText,
  error,
  id,
  label,
  labelOptional,
  layout = 'vertical',
  style,
  flex,
  responsive = true,
  size = 'medium',
  beforeLabel,
  afterLabel,
}: Props) {
  let containerClasses = [FormLayoutStyles['fui-formlayout']];

  if (size) {
    containerClasses.push(FormLayoutStyles[`fui-formlayout--${size}`]);
  }

  if (flex) {
    containerClasses.push(FormLayoutStyles['fui-formlayout--flex']);
    if (align === 'left') {
      containerClasses.push(FormLayoutStyles['fui-formlayout--flex-left']);
    }
    if (align === 'right') {
      containerClasses.push(FormLayoutStyles['fui-formlayout--flex-right']);
    }
  } else {
    containerClasses.push(
      responsive
        ? FormLayoutStyles['fui-formlayout--responsive']
        : FormLayoutStyles['fui-formlayout--non-responsive']
    );
  }

  if (className) {
    containerClasses.push(className);
  }

  const labelled = Boolean(label || beforeLabel || afterLabel);

  return (
    <div className={containerClasses.join(' ')}>
      {labelled || labelOptional || layout === 'horizontal' ? (
        <Space
          direction={
            (layout && layout === 'horizontal') ||
            (flex && layout && layout === 'vertical')
              ? 'vertical'
              : 'horizontal'
          }
          className={
            '' +
            (layout !== 'horizontal' && !flex
              ? FormLayoutStyles['fui-formlayout__label-container-horizontal']
              : FormLayoutStyles['fui-formlayout__label-container-vertical'])
          }
        >
          {labelled && (
            <label
              className={FormLayoutStyles['fui-formlayout__label']}
              htmlFor={id}
            >
              {beforeLabel && (
                <span
                  className={FormLayoutStyles['fui-formlayout__label-before']}
                  id={id + '-before'}
                >
                  {beforeLabel}
                </span>
              )}
              {label}
              {afterLabel && (
                <span
                  className={FormLayoutStyles['fui-formlayout__label-after']}
                  id={id + '-after'}
                >
                  {afterLabel}
                </span>
              )}
            </label>
          )}
          {labelOptional && (
            <span
              className={FormLayoutStyles['fui-formlayout__label-opt']}
              id={id + '-optional'}
            >
              {labelOptional}
            </span>
          )}
        </Space>
      ) : null}
      <div
        className={
          layout !== 'horizontal'
            ? FormLayoutStyles['fui-formlayout__content-container-horizontal']
            : FormLayoutStyles['fui-formlayout__content-container-vertical'] +
              (align === 'right'
                ? ` ${FormLayoutStyles['fui-formlayout__content-container-vertical--align-right']}`
                : '')
        }
        style={style}
      >
        {children}
        {error && (
          <p className={FormLayoutStyles['fui-formlayout__error']}>{error}</p>
        )}
        {descriptionText && (
          <p
            className={FormLayoutStyles['fui-formlayout__description']}
            id={id + '-description'}
          >
            {descriptionText}
          </p>
        )}
      </div>
    </div>
  );
}
