import './index.css'
import { setupUniver } from './setup-univer'

function main() {
  const univerAPI = setupUniver()
  window.univerAPI = univerAPI
}

main()
