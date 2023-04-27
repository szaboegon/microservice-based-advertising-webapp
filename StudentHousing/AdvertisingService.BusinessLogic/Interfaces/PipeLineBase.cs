namespace AdvertisingService.BusinessLogic.Interfaces
{
    public abstract class PipeLineBase <T, V>
    {
        protected readonly List<IFilter<T>> Operations = new List<IFilter<T>>();

        public PipeLineBase<T, V> Register(IFilter<T> operation)
        {
            Operations.Add(operation);

            return this;
        }

        public abstract Task<IEnumerable<V>> PerformOperation();
    }
}
