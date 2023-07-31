import { FlyoutProvider } from "./context"

function Flyout({ children }: { children: React.ReactNode }) {
  return (
    <FlyoutProvider>
      <div className="max-w-lg">
        {children}
      </div>
    </FlyoutProvider>
  )
}

export default Flyout

// Design: https://dribbble.com/shots/15131039-Quick-Search-dark-light