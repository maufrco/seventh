const selectors = {
    monitor: state => state.reducers.monitor,
    hosts: state => state.reducers.hosts,
    logState: state => console.log(state)
}
export {selectors}