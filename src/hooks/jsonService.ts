 class JSONService {
  static checkJSON(json: any) {
    try {
      return Object.keys(JSON.parse(json)).length > 0 ? JSON.parse(json) : "";
    } catch (e) { 
      return "";
    }
  }
}

export default JSONService;
