export class Page<T> {
  page: number;
  totalPage: number;
  results: T[];

  constructor(
    page: number,
    totalPage: number,
    results: T[],
  ) {
    this.page = page;
    this.totalPage = totalPage;
    this.results = results;
  }
}
