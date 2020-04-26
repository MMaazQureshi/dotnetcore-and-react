using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Data;
using FluentValidation;
using MediatR;

namespace Application.Activites
{
    public class Edit
    {
        public class Command : IRequest
        {
            //properties of object
            public Guid Id { get; set; }
            public string Title { get; set; }
            public string Description { get; set; }
            public string Category { get; set; }
            public DateTime? Date { get; set; }
            public string City { get; set; }
            public string Venue { get; set; }
        }
         public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Title).NotEmpty();
                RuleFor(x => x.Category).NotEmpty();
                RuleFor(x => x.City).NotEmpty();
                RuleFor(x => x.Date).NotEmpty();
                RuleFor(x => x.Description).NotEmpty();
                RuleFor(x => x.Venue).NotEmpty();



            }
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
                var activity = await context.Activities.FindAsync(request.Id);
                 if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound,new { activity= "Activity not found" });
                activity.Title = request.Title ?? activity.Title;
                activity.Venue = request.Venue ?? activity.Venue;
                activity.Description = request.Description ?? activity.Description;
                activity.Date = request.Date ?? activity.Date;
                activity.City = request.City ?? activity.City;
                activity.Category = request.Category ?? activity.Category;

                var success = await context.SaveChangesAsync() > 0;
                if (success) return Unit.Value;
                throw new Exception("Problem saving changes");

            }
        }
    }
}