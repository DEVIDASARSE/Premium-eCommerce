import React from 'react'

export default class ErrorBoundary extends React.Component{
  constructor(props){ super(props); this.state = { err: null }}
  static getDerivedStateFromError(err){ return { err } }
  componentDidCatch(){ }
  render(){
    if(this.state.err) return (
      <div className="min-h-[60vh] flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Something went wrong</h2>
          <p className="text-text-secondary">Try refreshing the page or come back later.</p>
        </div>
      </div>
    )
    return this.props.children
  }
}
