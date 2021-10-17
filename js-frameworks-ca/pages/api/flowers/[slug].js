const { flowers } = require('./data.json')

export default (req, res) => {
  const flur = flowers.filter(fl => fl.slug === req.query.slug)
  
    if(req.method === 'GET') {
    res.status(200).json(flur)
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({message: `Method ${req.method} is not possible` })
  }
}