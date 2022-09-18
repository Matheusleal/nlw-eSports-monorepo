import * as Dialog from '@radix-ui/react-dialog'

import { CreateAdBanner } from '../CreateAdBanner'
import { CreateAdModal } from './CreateAdModal'

export function NewAnnouncementDialog() {
  return (
    <Dialog.Root>

      <CreateAdBanner />

      <CreateAdModal />

    </Dialog.Root>
  )
}