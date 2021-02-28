```javascript
!(function (document, window) {
        var element = document.documentElement
        ios = navigator.userAgent.match(/iphone|ipod|ipad/gi)
        dpr = ios ? Math.min(window.devicePixelRatio, 3) : 1
        console.log('dpr', dpr)
        listener =
          'orientationchange' in window ? 'orientationchange' : 'resize'
        element.dataset.dpr = dpr
        for (
          var d, l, c = !1, meta = document.getElementsByTagName('meta'), r = 0;
          r < meta.length;
          r++
        ) {
          l = meta[r]
          'viewport' == l.name && ((c = !0), (d = l))
        }
        if (c) {
          d.content =
            'width=device-width,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no'
        } else {
          var meta = document.createElement('meta')
          meta.name = 'viewport'
          meta.content =
            'width=device-width,initial-scale=1.0,maximum-scale=1.0, minimum-scale=1.0,user-scalable=no'
          element.firstElementChild.appendChild(meta)
        }
        var s = function () {
          var document = element.clientWidth
          console.log('element.clientWidth', element.clientWidth)
          document / dpr > 750 && (document = 750 * dpr)
          console.log('document', document)
          window.remScale = document / 750
          console.log('remScale', remScale)
          element.style.fontSize = 100 * (document / 750) + 'px'
          console.log('fontSize', element.style.fontSize)
        }
        s()
        document.addEventListener && window.addEventListener(listener, s, !1)
      })(document, window)
```

