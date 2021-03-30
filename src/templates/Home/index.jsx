import './style.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { InputSearch } from '../../components/InputSearch';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    searchValue: ''
  };

  // Semelhante ao $scope.on no AngularJS
  // É invocado imediatamente após um componente ser montado (inserido na árvore).
  // Inicializações que exijam nós do DOM devem vir aqui.
  // Se precisar carregar data de um endpoint remoto, este é um bom lugar para instanciar sua requisição.
  async componentDidMount(){
    await this.loadPosts();
  }
  
  // Chamando postagens/imagens
  loadPosts = async () => {
    const { page, postsPerPage } = this.state;

    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  // Carrega mais posts / Paginação
  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  // Função para o search
  handleChange = (e) => {
    const { value } = e.target;

    this.setState({ searchValue: value })
  }

  // é invocado imediatamente após alguma atualização ocorrer.
  // Este método não é chamado pelo initial render.
  componentDidUpdate(){
    // 
  }
  
  // é invocado imediatamente antes que um componente seja desmontado e destruído.
  // Qualquer limpeza necessária deve ser realizada neste método, como invalidar timers,
  // cancelar requisições de rede, ou limpar qualquer subscrição que foi criada no componentDidMount()
  componentWillUnmount(){
    // 
  }

  // Ao renderizar no navegador
  // Observação: Quando o estado é atualizado, este render será chamado novamente
  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLocaleLowerCase()
        );
    })
    : posts;

    return (
      <section className="container">

      <div className="search-container">
        { !!searchValue && (
          <h1>Search value: {searchValue}</h1>
        )}
        
        {/* Exibe quantidade de posts encontrados */}
        { !!searchValue && (
          <span>Findeds posts: {filteredPosts.length}</span>
        )}

        {/* Campo de pesquisa */}
        <InputSearch searchValue={searchValue} handleChange={this.handleChange} />

        </div>

        {/* Posts */}
        {/* Se existir posts exibe tudo */}
        { filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {/* Se não existir posts exibe texto */}
        { filteredPosts.length === 0 && (
          <p>Ops... Não achamos o que você procurou :)</p>
        )}

        {/* Botão */}
        <div className="button-container">
          { !searchValue && (
            <Button
              text="Load more posts"
              onClick={this.loadMorePosts}
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}