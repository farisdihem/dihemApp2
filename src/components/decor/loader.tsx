interface LoaderProps {
  message: string;
}

export function Loader({ message }: LoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-14 text-center aspect-video">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-primary border-t-transparent" />
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sofa text-primary h-8 w-8"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11h20"/><path d="M3 11v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6"/><path d="M4 15H2"/><path d="M22 15h-2"/></svg>
      </div>
      <p className="mt-4 text-lg font-semibold text-muted-foreground animate-pulse">{message}</p>
    </div>
  );
}
