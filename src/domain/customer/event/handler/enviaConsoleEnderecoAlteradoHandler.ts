import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class EnviaConsoleEnderecoAlterado
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    const {eventData} = event
    console.log(`Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address}`); 
  }
}
