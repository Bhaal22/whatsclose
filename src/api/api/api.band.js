var express = require('express')

var searcher = require(__base + 'modules/searcher')

var router = express.Router()

router.route('/bands')
  .get(function (req, res) {
    var p = searcher.concerts_by_bands()
    p.then(function (concerts_by_band) {
      searcher.bands().then(function (bands) {
        var json = bands.map(function (band) {
          var b = band._source
          var o = concerts_by_band.filter(function (pair) {
            return pair.key === b.name
          })
          if (o[0] != null) {
            b.count = o[0].doc_count
          } else {
            b.count = 0
          }
          return b
        })

        res.json(json)
      })
    })
  })

router.route('/concerts')
  .get(function (req, res) {
    var params = {
      bandNames: req.query.bandNames,
      from: req.query.from,
      to: req.query.to,
      location: req.query.location,
      radius: req.query.radius
    }

    var p = searcher.search(params)
    p.then(function (data) {
      var jsonout = data.map(function (concert) {
        return concert._source
      })

      res.json(jsonout)
    })
  })

router.route('/styles')
  .get(function (req, res) {
    var p = searcher.getAllStyles()

    p.then(function (data) {
      res.json(data)
    })
  })
  .post(function (req, res) {
    var params = {
      styles: req.body.styles,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate
    }
  })

router.route('/venues/:id')
  .get(function (req, res) {
    var p = searcher.venue(req.params.id)

    p.then(function (data) {
      res.json(data)
    })
  })

router.route('/version')
  .get(function (req, res) {
    res.json({ version: '0.3' })
  })

module.exports = router
