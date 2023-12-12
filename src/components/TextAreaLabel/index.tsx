import * as S from './styles'

export interface ITextAreaLabel {
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
  resize?: 'both' | 'none' | 'vertical' | 'horizontal'
  bdColor?: string
  required: boolean
  label: string
  id: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  value?: string
  title?: string
}

export default function TextAreaLabel({
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
  resize = 'none',
  bdColor,
  required = false,
  label,
  id,
  onChange,
  value,
  title,
}: ITextAreaLabel) {
  return (
    <S.Conteiner
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
    >
      <S.Label htmlFor={id}>
        {required && <span>*</span>}
        {label}
      </S.Label>

      <S.TextArea
        id={id}
        required={required}
        $resize={resize}
        $bdColor={bdColor}
        placeholder={placeholder}
        onChange={onChange}
        name={id}
        title={title}
        value={value}
      />
    </S.Conteiner>
  )
}
