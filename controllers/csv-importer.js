var _ = require('lodash'),
    async = require('async'),
    BlattspinatStation = require('../models/BlattspinatStation'),
    BlattspinatStationNodes = require('../models/BlattspinatStationNodes'),
    secrets = require('../config/secrets'),
    csv = require('csv-parser'),
    fs = require('fs');

/**
 * GET /import/parseStation
 * Parse stations from csv file
 */
exports.parseStation = function(req, res) {
    fs.createReadStream('data/DBSuS-Uebersicht_Bahnhoefe-Stand2015-10.csv')
        .pipe(csv({
            separator: ';'
        }))
        .on('data', function(data) {
            var station = new Station({
                bfNr: data['Bf. Nr.'],
                bundesland: data.Bundesland,
                bm: data.BM,
                station: data.Station,
                bfDsAbk: data['Bf\nDS 100\nAbk.'],
                katVst: data['Kat.\nVst'],
                strasse: data['Straße'],
                plz: data.PLZ,
                ort: data.Ort,
                aufgabentraeger: data['Aufgabenträger'],
                verkehrsVerb: data['Ver-\nkehrs-\nverb.'],
                fernverkehr: data['Fern-\nverkehr'],
                nahverkehr: data['Nah-\nverkehr']
            });

            station.save();
        })
        .on('finish', function() {
            res.render('csv-importer', {
                title: 'Import CSV Data'
            });
        });
};

/**
 * GET /import/parseBlattspinatStation
 * Parse blattspinat stations from csv file
 */
exports.parseBlattspinatStation = function(req, res) {
    fs.createReadStream('data/blattspinat/stations_with_coordinates_v1.csv')
        .pipe(csv({
            separator: ';'
        }))
        .on('data', function(data) {
            var station = new BlattspinatStation({
                bahnhofNr: data['BahnhofNr'],
                bundesland: data['Bundesland'],
                bahnhofsmanagement: data['Bahnhofsmanagement'],
                station: data['Station'],
                ds100: data['DS100'],
                bahnhofskategorie: data['Bahnhofskategorie'],
                strasse: data['Strasse'],
                plz: data['PLZ'],
                ort: data['Ort'],
                aufgabentraeger: data['Aufgabenträger'],
                verkehrsVerb: data['Verkehrsverb'],
                fernverkehr: data['Fernverkehr'],
                nahverkehr: data['Nahverkehr'],
                lat: data['lat'],
                lon: data['lon']
            });

            station.save();
        })
        .on('finish', function() {
            res.render('csv-importer', {
                title: 'Import CSV Data'
            });
        });
};

/**
 * GET /import/parseBlattspinatStationNodes
 * Parse blattspinat stations nodes from csv file
 */
exports.parseBlattspinatStationNodes = function(req, res) {
    fs.createReadStream('data/blattspinat/BahnhoefeNeu.csv')
        .pipe(csv({
            separator: ';'
        }))
        .on('data', function(data) {
            var station = new BlattspinatStationNodes({
                bahnhofsId: data['BahnhofsId'],
                bahnhofname: data['Bahnhofname'],
                position: data['Position'],
                latitude: data['Latitude'],
                longitude: data['Longitude']
            });

            station.save();
        })
        .on('finish', function() {
            res.render('csv-importer', {
                title: 'Import CSV Data'
            });
        });
};