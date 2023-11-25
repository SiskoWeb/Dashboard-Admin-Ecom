"use client"

import { LayoutProviderType } from "@/types/types"
import { store } from "./store"
import React, { ReactNode } from "react"
import { Provider } from "react-redux"


function ReduxProvider({ children }: LayoutProviderType) {
  return <Provider store={store}>{children}</Provider>
}

export default ReduxProvider
