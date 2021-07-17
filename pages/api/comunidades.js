import {SiteClient} from 'datocms-client';

export default async function recebeRequests(request, response) {

  if (request.method == 'POST') {
    const TOKEN = '50eafaf10410e8ba02436d3dfd919b';
  const client = new SiteClient(TOKEN);
  
  const registroCriado = await client.items.create({
    itemType: "968632",
    ...request.body,
    // title: "Teste",
    // imageUrl: "htts://github.com/giovannat.png",
    // creatorslug: "giovanna",
  })
  console.log(registroCriado);
  response.json({
    registroCriado: registroCriado,
  })
  return;
  }
  response.status(404).json({
    message: 'Não há nada por aqui!'
  })
}