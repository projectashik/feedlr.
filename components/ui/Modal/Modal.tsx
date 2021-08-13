import React, { useEffect } from 'react';
// @ts-ignore
import ModalStyles from './Modal.module.css';
import { Button, Typography, Space } from '..';
import { AnimationTailwindClasses } from 'types';

import * as Dialog from '@radix-ui/react-dialog';

import { Transition } from '@headlessui/react';
import { FiX } from 'react-icons/fi';

interface Props {
  children?: React.ReactNode;
  customFooter?: React.ReactNode;
  closable?: boolean;
  description?: string;
  hideFooter?: boolean;
  alignFooter?: 'right' | 'left';
  layout?: 'horizontal' | 'vertical';
  icon?: React.ReactNode;
  loading?: boolean;
  onCancel?: any;
  cancelText?: string;
  onConfirm?: any;
  confirmText?: string;
  showIcon?: boolean;
  footerBackground?: boolean;
  title?: string;
  variant?: 'danger' | 'warning' | 'success';
  visible: boolean;
  size?: 'tiny' | 'small' | 'medium' | 'large';
  style?: React.CSSProperties;
  overlayStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  className?: string;
  overlayClassName?: string;
  transition?: AnimationTailwindClasses;
  transitionOverlay?: AnimationTailwindClasses;
  triggerElement?: React.ReactNode;
  confirmButtonType?: 'primary' | 'link' | 'text' | 'default' | 'outline';
}

const Modal = ({
  children,
  customFooter = undefined,
  closable,
  description,
  hideFooter = false,
  alignFooter = 'left',
  layout = 'horizontal',
  loading = false,
  onCancel,
  cancelText = 'Cancel',
  onConfirm,
  confirmText = 'Confirm',
  showIcon = false,
  title,
  footerBackground,
  icon,
  variant = 'success',
  visible = false,
  size = 'large',
  style,
  overlayStyle,
  contentStyle,
  className = '',
  overlayClassName,
  triggerElement,
  confirmButtonType = 'primary',
}: Props) => {
  const [open, setOpen] = React.useState(visible ? visible : false);

  useEffect(() => {
    setOpen(visible);
  }, [visible]);

  function stopPropagation(e: React.MouseEvent) {
    e.stopPropagation();
  }

  let footerClasses = [ModalStyles['fui-modal-footer']];
  if (footerBackground) {
    footerClasses.push(ModalStyles['fui-modal-footer--with-bg']);
  }

  let modalClasses = [
    ModalStyles[`fui-modal`],
    ModalStyles[`fui-modal--${size}`],
  ];
  if (className) modalClasses.push(className);

  let overlayClasses = [ModalStyles['fui-modal-overlay']];
  if (overlayClassName) overlayClasses.push(overlayClassName);

  const footerContent = customFooter ? (
    customFooter
  ) : (
    <Space
      style={{
        width: '100%',
        justifyContent:
          layout === 'vertical'
            ? 'center'
            : alignFooter === 'right'
            ? 'flex-end'
            : 'flex-start',
      }}
    >
      <Button
        type='outline'
        onClick={() => (onCancel ? onCancel() : null)}
        disabled={loading}
      >
        {cancelText}
      </Button>
      <Button
        type={confirmButtonType}
        onClick={() => (onConfirm ? onConfirm() : null)}
        loading={loading}
        danger={variant === 'danger'}
      >
        {confirmText}
      </Button>
    </Space>
  );

  function handleOpenChange(open: boolean) {
    if (visible !== undefined && !open) {
      // controlled component behaviour
      onCancel();
    } else {
      // un-controlled component behaviour
      setOpen(open);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      {triggerElement && (
        <Dialog.Trigger className={ModalStyles[`fui-modal__trigger`]}>
          {triggerElement}
        </Dialog.Trigger>
      )}
      <Transition show={open}>
        <Dialog.Overlay forceMount>
          <Transition.Child
            enter={ModalStyles[`fui-modal-overlay--enter`]}
            enterFrom={ModalStyles[`fui-modal-overlay--enterFrom`]}
            enterTo={ModalStyles[`fui-modal-overlay--enterTo`]}
            leave={ModalStyles[`fui-modal-overlay--leave`]}
            leaveFrom={ModalStyles[`fui-modal-overlay--leaveFrom`]}
            leaveTo={ModalStyles[`fui-modal-overlay--leaveTo`]}
          >
            <div className={ModalStyles['fui-modal-overlay-container']}>
              <div
                className={overlayClasses.join(' ')}
                style={overlayStyle}
              ></div>
            </div>
          </Transition.Child>
        </Dialog.Overlay>
        <Dialog.Content forceMount style={{ width: '100vw' }}>
          <div
            className={ModalStyles['fui-modal-container'] + ' ' + className}
            onClick={() => (onCancel ? onCancel() : null)}
          >
            <div className={ModalStyles['fui-modal-flex-container']}>
              {/* <!-- This element is to trick the browser into centering the modal contents. --> */}
              <span className={ModalStyles['fui-modal-div-trick']}></span>
              <Transition.Child
                enter={ModalStyles[`fui-modal--enter`]}
                enterFrom={ModalStyles[`fui-modal--enterFrom`]}
                enterTo={ModalStyles[`fui-modal--enterTo`]}
                leave={ModalStyles[`fui-modal--leave`]}
                leaveFrom={ModalStyles[`fui-modal--leaveFrom`]}
                leaveTo={ModalStyles[`fui-modal--leaveTo`]}
                className='fixed inset-0 overflow-y-auto'
              >
                <div
                  className={modalClasses.join(' ')}
                  role='dialog'
                  aria-modal='true'
                  aria-labelledby='modal-headline'
                  onClick={stopPropagation}
                  style={style}
                >
                  <div
                    className={ModalStyles['fui-modal-content']}
                    style={contentStyle}
                  >
                    <Space
                      size={5}
                      style={{
                        alignItems:
                          layout === 'vertical' ? 'center' : 'flex-start',
                      }}
                      direction={layout}
                    >
                      {icon ? icon : null}
                      <Space
                        size={4}
                        direction='vertical'
                        style={{
                          alignItems: 'flex-start',
                          textAlign: layout === 'vertical' ? 'center' : null,
                          width: '100%',
                        }}
                      >
                        <span style={{ width: 'inherit' }}>
                          {title && (
                            <Typography.Title
                              style={{
                                marginBottom: '.1rem',
                                marginTop: '0',
                              }}
                              level={4}
                            >
                              {title}
                            </Typography.Title>
                          )}
                          {description && (
                            <Typography.Text>{description}</Typography.Text>
                          )}
                        </span>

                        {children}
                        {!footerBackground && !hideFooter && footerContent}
                      </Space>
                    </Space>
                  </div>
                  {!hideFooter && footerBackground && (
                    <div className={footerClasses.join(' ')}>
                      {footerContent}
                    </div>
                  )}
                  {closable && (
                    <div className={ModalStyles['fui-modal-close-container']}>
                      <Button
                        onClick={onCancel}
                        type='text'
                        className='h-8'
                        icon={<FiX size='medium' />}
                      />
                    </div>
                  )}
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog.Content>
      </Transition>
    </Dialog.Root>
  );
};

export default Modal;
