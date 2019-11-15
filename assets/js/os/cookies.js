import Master from "./master"

export default class Cookies extends Master {

    constructor() {
        super();
    }
    
    Set(cname, cvalue, exdays) {
        var d = new Date()
        d.setTime(d.getTime() + ((exdays || 36500) * 24 * 60 * 60 * 1000))
        var expires = "expires=" + d.toUTCString()
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
    }
      
    Get(cname) {
        var name = cname + "="
        var ca = document.cookie.split(';')
        for(var i = 0; i < ca.length; i++) {
          var c = ca[i]
          while (c.charAt(0) == ' ') {
            c = c.substring(1)
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length)
          }
        }
        return ""
    }

    Check(cname) {
        const cookie = this.Get(cname)
        return (cookie != "") ? cookie : false
    }

}