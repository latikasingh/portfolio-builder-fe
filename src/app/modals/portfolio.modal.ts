export interface IPortfolio {
  type: string;
  name: string;
  descriptionTitle: string;
  description: string;
  projectImages: any[];
  link: string;
}

export interface IPortfolioDto extends IPortfolio {
  user: string;
  id: string;
}
