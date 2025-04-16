import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { removeAuthToken } from "@/services/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function NavUser({ user }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  
  const handleLogout = () => {
    removeAuthToken()
    setOpen(false)
    router.push("/login")
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <SidebarMenuButton size="lg" className="cursor-pointer" asChild>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">SG</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </SidebarMenuButton>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Êtes-vous sûr de vouloir vous déconnecter ?</DialogTitle>
              <DialogDescription>
                Cette action vous redirigera vers la page de connexion.
              </DialogDescription>
              <div className="flex justify-end mt-4 gap-2">
                <Button variant="ghost" className="cursor-pointer" onClick={() => setOpen(false)}>Annuler</Button>
                <Button variant="destructive" className="cursor-pointer" onClick={handleLogout}>Déconnexion</Button>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
