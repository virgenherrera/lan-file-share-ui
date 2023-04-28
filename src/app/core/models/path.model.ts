export class Path {
  public name: string;
  public parent: Path | null;

  constructor(public path = '', parent: Path | null = null) {
    this.path = path;
    this.name = !path ? '<Home>' : (path.split('/').pop() as string);
    this.parent = parent;
  }
}
