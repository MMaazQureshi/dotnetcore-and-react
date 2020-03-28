using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Data;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Activites
{
    public class List
    {
        public class Query:IRequest<List<Activity>> {}

        public class Handler : IRequestHandler<Query,List<Activity>>
        {public DataContext Context { get; }
            public Handler(DataContext context)
            {
                this.Context = context;
            }

            

            public async Task<List<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activites = await Context.Activities.ToListAsync();

                    return activites;
            }
        }
    }
}