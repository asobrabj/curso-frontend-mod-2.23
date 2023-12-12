import styled from 'styled-components'

interface ISelectLabelStyle {
  $fs?: 'xsmall' | 'small' | 'medium' | 'larger' | string
  $fStyle?: 'normal' | 'italic'
  $fw?: 'medium' | 'larger'
  $fFamily?: string
  $tAlign?: 'start' | 'end' | 'justify' | 'center'
  $tTransform?: 'none' | 'capitalize' | 'uppercase' | 'lowercase'
  $color?: string
  $bgColor?: string
  $pd?: 'xsmall' | 'small' | 'medium' | 'larger' | 'xlarger' | 'none'
  $pdTop?: string
  $pdBottom?: string
  $pdRigth?: string
  $pdLeft?: string
  $mg?: 'xsmall' | 'small' | 'medium' | 'larger' | 'xlarger' | 'none'
  $mgTop?: string
  $mgBottom?: string
  $mgRigth?: string
  $mgLeft?: string
  $width?: string
  $height?: string
  $visible: boolean
  $bdColor?: string
}

interface Defaults {
  [key: string]: string
}

const fontSize = (fs: string): string => {
  const defaults: Defaults = {
    xsmall: '14',
    small: '16',
    medium: '24',
    larger: '32',
  }
  const value = defaults[`${fs}`] || fs
  return `${value}px`
}

const fontWheigt = (fw: string): string => {
  const defaults: Defaults = {
    medium: '400',
    larger: 'bold',
  }
  const value = defaults[`${fw}`]
  return value
}

const paddingFn = (pd: string): string => {
  const defaults: Defaults = {
    xsmall: '5',
    small: '8',
    medium: '16',
    larger: '24',
    xlarger: '32',
  }
  const value = defaults[`${pd}`] ? `${defaults[`${pd}`]}px` : ''
  return value
}

const marginFn = (mg: string): string => {
  const defaults: Defaults = {
    xsmall: '5',
    small: '8',
    medium: '16',
    larger: '24',
    xlarger: '32',
  }
  const value = defaults[`${mg}`] ? `${defaults[`${mg}`]}px` : ''
  return value
}

export const Label = styled.label`
  position: absolute;
  top: -12px;
  left: 12px;
  background-color: '';

  span {
    font-size: 14px;
    color: red;
    margin-right: 3px;
  }
`

export const Select = styled.div<ISelectLabelStyle>`
  font-style: ${(props) => props.$fStyle || ''};
  font-weight: ${(props) => (props.$fw ? fontWheigt(props.$fw) : '')};
  font-family: ${(props) => props.$fFamily || ''};
  text-align: ${(props) => props.$tAlign || ''};
  text-transform: ${(props) => props.$tTransform || ''};
  color: ${(props) => props.$color || ''};
  background-color: ${(props) => props.$bgColor || ''};
  padding: ${(props) => (props.$pd ? paddingFn(props.$pd) : '')};
  padding-top: ${(props) => (props.$pdTop ? props.$pdTop + 'px' : '')};
  padding-left: ${(props) => (props.$pdLeft ? props.$pdLeft + 'px' : '')};
  padding-right: ${(props) => (props.$pdRigth ? props.$pdRigth + 'px' : '')};
  padding-bottom: ${(props) => (props.$pdBottom ? props.$pdBottom + 'px' : '')};
  margin: ${(props) => (props.$mg ? marginFn(props.$mg) : '')};
  margin-top: ${(props) => (props.$mgTop ? props.$mgTop + 'px' : '')};
  margin-left: ${(props) => (props.$mgLeft ? props.$mgLeft + 'px' : '')};
  margin-right: ${(props) => (props.$mgRigth ? props.$mgRigth + 'px' : '')};
  margin-bottom: ${(props) => (props.$mgBottom ? props.$mgBottom + 'px' : '')};
  width: ${(props) => (props.$width ? props.$width + 'px' : '')};
  height: ${(props) => (props.$height ? props.$height + 'px' : '')};
  border: 1px solid #00abff;
  border-color: ${(props) => props.$bdColor || ''};
  position: relative;

  &.primary {
    width: ${(props) => (props.$width ? props.$width + 'px' : '200px')};
    padding: ${(props) => (props.$pd ? paddingFn(props.$pd) : '8px')};
    border-radius: 8px;
    border-color: ${(props) => props.$bdColor || ''};
  }

  &.secondary {
    width: ${(props) => (props.$width ? props.$width + 'px' : '200px')};
    padding: ${(props) => (props.$pd ? paddingFn(props.$pd) : '8px')};
    border-radius: 8px 0;
    border-color: ${(props) => props.$bdColor || ''};
  }

  &.error {
    border: 1px solid #ff0000;
    color: ${(props) => props.$color || '#ff0000'};
    &:focus {
      border: 2px solid #ff0000;
    }
  }
  &:active {
    border-color: ${(props) => props.$bdColor || ''};
  }

  & select {
    display: none;
  }

  &.custom-select {
    position: relative;
    display: inline-block;
    width: 100%;
  }

  .custom-select-trigger {
    width: 100%;
    cursor: pointer;
    height: 20px;
  }

  .custom-options {
    background-color: '';
    display: ${(props) => (props.$visible ? 'block' : 'none')};
    position: absolute;
    top: 100%;
    left: 0px;
    right: 0;
    background-color: #fff;
    border: 1px solid #00abff;
    max-width: ${(props) => (props.$width ? props.$width + 'px' : '215px')};
    width: 100%;
    max-height: 114px;
    overflow-y: auto;
    z-index: 1;
    font-size: ${(props) => (props.$fs ? fontSize(props.$fs) : '')};

    &.primary {
      border-radius: 8px;
      border-color: ${(props) => props.$bdColor || ''};
    }
    &.secondary {
      border-radius: 8px 0;
      border-color: ${(props) => props.$bdColor || ''};
    }
  }

  .custom-option {
    padding: 10px;
    cursor: pointer;
    font-size: ${(props) => (props.$fs ? fontSize(props.$fs) : '')};
  }

  .custom-option:hover {
    background-color: '';
    color: ${(props) => props.$color || '#00abff'};
  }
`
