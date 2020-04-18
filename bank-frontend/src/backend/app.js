

export class AppFactory {
  constructor(baseUrl) {
    this._baseUrl = baseUrl || 'http://localhost:3000';
    this._links = {
      root: '/'
    };
  }

  get baseUrl () {
    return this._baseUrl;
  }

  get links () {
    return this._links;
  }

  get hasLinks () {
    return !!this._hasLinks
  }
  
  setLink(name, link) {
    this._links[name] = link.replace(this._baseUrl, "");
    this._hasLinks = true;
  }

  getFullLink(name) {
    return this._baseUrl + this._links[name]
  }

  getRelativePath(name) {
    return this._links[name];
  }
}