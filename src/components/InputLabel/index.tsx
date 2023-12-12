import * as S from './styles'

export interface IInputLabel {
  fs?: 'xsmall' | 'small' | 'medium' | 'larger' | string
  fStyle?: 'normal' | 'italic'
  fw?: 'medium' | 'larger'
  fFamily?: string
  tAlign?: 'start' | 'end' | 'justify' | 'center'
  tTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  color?: string
  bgColor?: string
  pd?: 'xsmall' | 'small' | 'medium' | 'larger' | 'xlarger' | 'none'
  pdTop?: string
  pdBottom?: string
  pdRigth?: string
  pdLeft?: string
  mg?: 'xsmall' | 'small' | 'medium' | 'larger' | 'xlarger' | 'none'
  mgTop?: string
  mgBottom?: string
  mgRigth?: string
  mgLeft?: string
  className?: string
  width?: string
  height?: string
  placeholder?: string
  bdColor?: string
  type?:
    | 'text'
    | 'tel'
    | 'password'
    | 'email'
    | 'time'
    | 'date'
    | 'datetime-local'
    | 'radio'
    | 'checkbox'
    | 'file'
    | 'hidden'
    | 'number'
  required: boolean
  label: string
  id: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClick?: () => void
  value?: string
}

export default function InputLabel({
  fs,
  fStyle,
  fw,
  fFamily,
  tAlign,
  tTransform,
  color,
  bgColor,
  pd,
  pdTop,
  pdRigth,
  pdLeft,
  pdBottom,
  mg,
  mgTop,
  mgRigth,
  mgLeft,
  mgBottom,
  className,
  width,
  height,
  placeholder,
  bdColor,
  type = 'text',
  required = false,
  label,
  id,
  onChange,
  onClick,
  value,
}: IInputLabel) {
  return (
    <S.InputLabel
      className={`primary ${className}`}
      $fs={fs}
      $fw={fw}
      $fStyle={fStyle}
      $fFamily={fFamily}
      $tAlign={tAlign}
      $tTransform={tTransform}
      $color={color}
      $bgColor={bgColor}
      $pd={pd}
      $pdTop={pdTop}
      $pdRigth={pdRigth}
      $pdLeft={pdLeft}
      $pdBottom={pdBottom}
      $mg={mg}
      $mgTop={mgTop}
      $mgRigth={mgRigth}
      $mgLeft={mgLeft}
      $mgBottom={mgBottom}
      $width={width}
      $height={height}
      $bdColor={bdColor}
    >
      <S.Label htmlFor={`${id}-id`}>
        {required && <span>*</span>}
        {label}
      </S.Label>
      <S.Input
        title={`title-${id}`}
        type={type}
        placeholder={placeholder}
        id={`${id}-id`}
        required={required}
        name={id}
        onChange={onChange}
        onClick={onClick}
        value={value}
      />
    </S.InputLabel>
  )
}
