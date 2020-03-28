using System;
using System.Threading;
using System.Threading.Tasks;
using Data;
using MediatR;

namespace Application.Activites
{
    public class Delete
    {
        public class Command : IRequest
        {
            //properties of object
            public Guid Id { get; set; }
        }
        public class handler : IRequestHandler<Command>
        {
            private readonly DataContext context;

            public handler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                //handler logic goes here
                var activity = await context.Activities.FindAsync(request.Id);
                if (activity == null)
                    throw new Exception("Avtivity not found");
                context.Activities.Remove(activity);
                var success = await context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");

            }
        }
    }
}