export declare global {

  namespace ReactNavigation {

    interface RootParamList {
      home: undefined
      game: GameRouteParams
    }

  }

}



export interface GameRouteParams {
  id: string
  title: string
  bannerUrl: string
}