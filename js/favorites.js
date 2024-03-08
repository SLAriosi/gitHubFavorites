// Classe que vai conter a lógica dos dados
// como os dados serão estruturados

export class Favorites {
   constructor(root) {
      this.root = document.querySelector(root)
      this.load()
   }

   load() {
      this.entries = [
         {
            login: 'SLAriosi',
            name: 'Ariosi Lucas',
            public_repos: '76',
            followers: '120000',
         },
         {
            login: 'maykbrito',
            name: 'Mayk Brito',
            public_repos: '80',
            followers: '96000',
         },
      ]
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

   this.entries.forEach( user => {
      const row = this.createRow()

      row.querySelector('.user img').src = `https://github.com/${user.login}.png`

      row.querySelector('.user img').alt = `Imagem de ${user.name}`

      row.querySelector('.user p').textContent = user.name
      
      row.querySelector('.user span').textContent = user.login
      
      row.querySelector('.repositories').textContent = user.public_repos

      row.querySelector('.followers').textContent = user.followers

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