namespace AdvertisingService.BusinessLogic.Interfaces
{
    public abstract class PipeLineBase <T>
    {
        protected readonly List<IFilter<T>> Operations = new List<IFilter<T>>();

        public PipeLineBase<T> Register(IFilter<T> operation)
        {
            Operations.Add(operation);

            return this;
        }

        public abstract Task<IEnumerable<T>> PerformOperation();
    }
}
