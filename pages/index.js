import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import React from 'react';
import {AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault} from '../src/lib/AlurakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';

function ProfileSidebar(props){
  return(
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} style={{borderRadius: '8px'}}></img>
      <hr/>
        <p>
          <a className="boxLink" href={`https://github.com/${props.githubUser}`} >
          @{props.githubUser}
          </a>
        </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box> 
  )
}

function ProfileRelationsBox(props){
  return(
    <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                {props.title} ({props.items.length})
              </h2>
              <ul>
                {props.items.map((itemAtual,i)=>{
                if (i<6)return(
                  <li  key={itemAtual.id}>
                    <a href={`/users/${itemAtual.login}`}>
                      <img src={itemAtual.avatar_url}/>
                      <span>
                        {itemAtual.login}
                      </span>
                    </a>
                  </li>
                
                )
              })}
            </ul> 
          </ProfileRelationsBoxWrapper>
  )
}


export default function Home() {
    
    const [comunidades, setComunidades]=React.useState([{

    }]);

    const githubUser = 'GiovannaT';
    const pessoasFavoritas = ['juunegreiros', 'peas']

    //pegar um array de dados do github
    const [seguidores, setSeguidores] = React.useState([]);
    React.useEffect(function(){
      //fetch cria uma Promise, e essa promise traz um array
      fetch('https://api.github.com/users/giovannat/followers')
    .then(function(respostaServidor){
      return respostaServidor.json();
    })
    .then(function(respostaCompleta){
      setSeguidores(respostaCompleta);
    })
    
    //GRAPHQL
    fetch('https://graphql.datocms.com/',{
      method: 'POST',
      headers:{
        'Authorization':'f5224171da25d0e142c628bad628dc',
        'Content-Type': 'application/json',
        'Accept':'application/json',
      },
      //corpo da requisição:
      body: JSON.stringify({"query":`query {
        allCommunities{
          title
          id
          imageUrl
          creatorslug
        }
      }`})
    })
    .then((response) => response.json())
    //.then(function(response){return response.json()})
    //OU
    //.then((respostaCompleta) => {console.log(respostaCompleta)})
    .then((respostaCompleta)=>{
      //o dado que está trazendo será prefixado pelo dado que está trazendo no stringify
      const comunidadesDato = respostaCompleta.data.allCommunities;
      console.log(comunidadesDato)
      setComunidades(comunidadesDato)
    })

    }, [])


    return (
      <>
        <AlurakutMenu githubUser={githubUser}/>
        <MainGrid> 
        
          <div className="profileArea" style={{gridArea: 'profileArea'}}>
            <ProfileSidebar githubUser={githubUser}/>
          </div>
          <div className="welcomeArea"style={{gridArea: 'welcomeArea'}}>
            <Box as="aside">
              <h1 className="title">Bem vindo(a)</h1>
              <OrkutNostalgicIconSet/>
            </Box>

            <Box>
              <h2 className="subTitle">
                O que vc deseja fazer
                </h2>
                <form onSubmit={(e)=>{
                  e.preventDefault();
                  //receber dados do form
                  const dadosDoForm = new FormData(e.target);
                  console.log('Campo: ', dadosDoForm.get('title'));

                  console.log('Campo: ', dadosDoForm.get('image'));

                  const comunidade={
                    title: dadosDoForm.get('title'),
                    imageUrl:dadosDoForm.get('image'),
                    creatorslug: 'giovannat',
                  }
                  
                  fetch('/api/comunidades', {
                    method: 'POST',
                    headers:{
                      'Content-Type':'application/json'
                    },
                    body: JSON.stringify(comunidade)
                  })
                  .then(async(response)=>{
                    const dados = await response.json();
                    console.log(dados.registroCriado);
                    const comunidade = dados.registroCriado;

                    const comunidadesAtualizadas = [...comunidades, comunidade];
                    setComunidades(comunidadesAtualizadas)
                  })
                  
                }}>
                  <div>
                    <input placeholder="Qual será o nome da sua comunidade?"
                    name="title"
                    aria-label="Qual será o nome da sua comunidade?"
                    type="text"/>
                  </div>
                  
                  <div>
                    <input placeholder="URL para a capa"
                    name="image"
                    aria-label="URL para a capa"/>
                  </div>

                  <button>
                    Criar comunidade
                  </button>
                </form>
            </Box>
          </div>
          <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBox title="Amigos" items={seguidores}/>
              <ProfileRelationsBoxWrapper>
              <h2 className="smallTitle">
                Pessoas da Comunidade ({pessoasFavoritas.length})
              </h2>
              <ul>
                {pessoasFavoritas.map((itemAtual)=>{
                return(
                  <li  key={itemAtual}>
                    <a href={`/users/${itemAtual}`} key={itemAtual}>
                      <img src={`https://github.com/${itemAtual}.png`}/>
                      <span>
                        {itemAtual}
                      </span>
                    </a>
                  </li>
                
                )
              })}
            </ul> 
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Minhas Comunidades 
            <p className="numberOfProfile">({comunidades.length})</p>
            </h2>
            <ul>
              {comunidades.map((itemAtual)=>{
                return(
                  <li  key={itemAtual.id}>
                    <a href={`/communities/${itemAtual.title}`}>
                      <img src={itemAtual.imageUrl}/>
                      <span>
                        {itemAtual.title}
                      </span>
                    </a>
                  </li>
                )
              })}
            </ul> 
          </ProfileRelationsBoxWrapper>

          </div>
        </MainGrid>
      </>
  );
}
