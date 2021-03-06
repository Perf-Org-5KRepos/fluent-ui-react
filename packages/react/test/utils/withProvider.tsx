import { emptyTheme, ThemeInput } from '@fluentui/styles'
import * as React from 'react'
import { mount, MountRendererProps, ComponentType } from 'enzyme'
import { ThemeProvider } from 'react-fela'

import { felaRenderer } from 'src/utils'
import { ProviderContextPrepared } from 'src/types'

export const EmptyThemeProvider: React.FunctionComponent = ({ children }) => {
  const theme: ProviderContextPrepared = {
    renderer: felaRenderer,
    target: document,
    disableAnimations: false,
    rtl: false,
    theme: emptyTheme,
    telemetry: undefined,
    performance: {} as any,
  }

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export const mountWithProvider = <C extends React.Component, P = C['props'], S = C['state']>(
  node: React.ReactElement<P>,
  options?: MountRendererProps,
  theme?: ThemeInput,
) => {
  return mount(node, {
    wrappingComponent: EmptyThemeProvider,
    ...options,
  })
}

export const mountWithProviderAndGetComponent = <
  C extends React.Component,
  P = C['props'],
  S = C['state']
>(
  Component: ComponentType<P>,
  elementToMount: React.ReactElement<P>,
  options?: MountRendererProps,
  theme?: ThemeInput,
) => {
  return mountWithProvider(elementToMount, options, theme).find(Component)
}
