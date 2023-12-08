import * as S from './styles';

interface IModal {
  children: React.ReactNode;
  width?: string;
  height?: string;
  paddingSides?: string;
  margin?: string;
}

export default function Modal({
  children,
  height,
  width,
  paddingSides,
  margin,
}: IModal) {
  return (
    <S.Modal
      $height={height}
      $width={width}
      $paddingSides={paddingSides}
      $margin={margin}
    >
      {children}
    </S.Modal>
  );
}
