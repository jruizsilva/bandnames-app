const Band = require('./band')

class BandList {
  constructor() {
    this.bands = [
      new Band('Banda 1'),
      new Band('Banda 2'),
      new Band('Banda 3'),
      new Band('Banda 4')
    ]
  }
  addBand(name) {
    const newBand = new Band(name)
    this.bands = [...this.bands, newBand]
    return this.bands
  }
  removeBand(id) {
    this.bands = this.bands.filter(band => band.id !== id)
  }
  getBands() {
    return this.bands
  }
  increaseVotes(id) {
    this.bands = this.bands.map(band =>
      band.id === id
        ? { ...band, votes: band.votes + 1 }
        : band
    )
  }
  changeName(id, newName) {
    this.bands = this.bands.map(band =>
      band.id === id ? { ...band, name: newName } : band
    )
  }
}

module.exports = BandList
