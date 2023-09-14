using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AdvertisingService.BusinessLogic.DataTransferObjects;

public record PagedQueryResponse<T>(List<T> Items, int CurrentPage, int TotalPages, int PageItemCount, int TotalItemCount);