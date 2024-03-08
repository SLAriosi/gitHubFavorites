export class GithubUser {
   static search(username) {
      const endpoint = `https://api.github.com/users/${username}`

      return fetch(endpoint)
      .then(data => data.json())
      .then(({ login, name, public_repos, followers}) => ({
         login,
         name,
         public_repos,
         followers,
      }))
   }
}

// Classe que vai conter a lógica dos dados
// como os dados serão estruturados
export class Favorites {
   constructor(root) {
      this.root = document.querySelector(root)
      this.load()

      GithubUser.search('SLAriosi').then(user => console.log(user))
   }

   load() {
      this.entries =  JSON.parse(localStorage.getItem('@github-favorites:')) || []      
   }

   delete(user) {
      //Higher-order functions (map, find, reduce)
      const filteredEntries = this.entries.filter(entry => entry.login !== user.login)

      this.entries = filteredEntries
      this.update()
   }

      
}

//classe que vai criar a visualização e eventos do HTML
export class FavoritesView extends Favorites {
   constructor(root) {
      super(root)

      this.tbody = this.root.querySelector('table tbody')

      this.update()
   }

   update() {
      this.removeAllTr()

      this.entries.forEach(user => {
         const row = this.createRow()

         row.querySelector('.user img').src = `https://github.com/${user.login}.png`

         row.querySelector('.user img').alt = `Imagem de ${user.name}`

         row.querySelector('.user p').textContent = user.name

         row.querySelector('.user span').textContent = user.login

         row.querySelector('.repositories').textContent = user.public_repos

         row.querySelector('.followers').textContent = user.followers

         row.querySelector('.remove').onclick = () => {
            const iMakeSure = confirm('Tem certeza que deseja deletar essa linha ?')
            if (iMakeSure) {
               this.delete(user)
            }
         }

         this.tbody.append(row)
      })
   }

   createRow() {
      const tr = document.createElement("tr")

      tr.innerHTML = `
            <td class="user">
               <img src="https://github.com/SLAriosi.png" alt="Imagem de Lucas Ariosi">
                  <a href="https://github.com/SLAriosi" target="_blank">
                     <p>Ariosi Lucas</p>
                     <span>SLAriosi</span>
                  </a>
            </td>
            <td class="repositories">
               76
            </td>
            <td class="followers">
               9589
            </td>
            <td>
               <button class="remove">&times;</button>
            </td>
         </tr>
         `
      return tr
   }

   removeAllTr() {
      this.tbody.querySelectorAll('tr').forEach((tr) => {
         tr.remove()
      })
   }
}