import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import React from 'react';
import {AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault} from '../src/lib/AlurakutCommons'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations';


// const Title = styled.h1`
//   font-size: 50px;
//   color: ${({ theme }) => theme.colors.primary};
// `

function ProfileSidebar(props){
  return(
    <Box >
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


export default function Home() {
    const usuarioAleatorio = 'omariosouto'
    const [comunidades, setComunidades]=React.useState([{
      id: new Date().toISOString(),
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    }]);
    // const comunidades = comunidades[0];
    // const setComunidades=comunidades[1];

    const githubUser = 'GiovannaT';
    const pessoasFavoritas = ['juunegreiros', 'peas']

    return (
      <>
        <AlurakutMenu />
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
                <form onSubmit={function handleCriaComunidade(e){
                  e.preventDefault();
                  //receber dados do form
                  const dadosDoForm = new FormData(e.target);
                  console.log('Campo: ', dadosDoForm.get('title'));

                  console.log('Campo: ', dadosDoForm.get('image'));

                  const comunidade={
                    id: '1234567899',
                    title:dadosDoForm.get('title'),
                    image:dadosDoForm.get('image'),
                  }

                  const comunidadesAtualizadas = [...comunidades, comunidade];
                  setComunidades(comunidadesAtualizadas)
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
              </h2>
            </Box>
          </div>
          <div class="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>

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
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image}/>
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
