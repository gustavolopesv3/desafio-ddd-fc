import ChangedAdressCustomerEvent from "../../customer/event/changed-address-customer.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import EnviaConsoleEnderecoAlterado from "../../customer/event/handler/enviaConsoleEnderecoAlteradoHandler";
import EnviaConsoleLog1Handler from "../../customer/event/handler/enviaConsoleLog1Handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/enviaConsoleLog2Handler";
import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events tests", () => {
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      1
    );
    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeDefined();
    expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(
      0
    );
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"]
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("ProductCreatedEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
    ).toMatchObject(eventHandler);

    const productCreatedEvent = new ProductCreatedEvent({
      name: "Product 1",
      description: "Product 1 description",
      price: 10.0,
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(productCreatedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });

  it("should notify all event handlers customer", () => {
    const eventDispatcher = new EventDispatcher();

    const console1Event = new EnviaConsoleLog1Handler();
    const spyConsole1Event = jest.spyOn(console1Event, "handle");
    eventDispatcher.register("CustomerCreatedEvent", console1Event);

    const console2Event = new EnviaConsoleLog2Handler();
    const spyConsole2Event = jest.spyOn(console2Event, "handle");
    eventDispatcher.register("CustomerCreatedEvent", console2Event);

    const consoleAddressChanged = new EnviaConsoleEnderecoAlterado()
    const spychangedAddressCustomerEnvent = jest.spyOn(consoleAddressChanged, "handle");
    eventDispatcher.register("ChangedAdressCustomerEvent", consoleAddressChanged);


    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(console1Event);

    

    const customerCreated = new CustomerCreatedEvent({
      name: "Customer 1",
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(customerCreated);

    expect(spyConsole1Event).toHaveBeenCalled();
    expect(spyConsole2Event).toHaveBeenCalled();

    expect(
      eventDispatcher.getEventHandlers["ChangedAdressCustomerEvent"][0]
    ).toMatchObject(consoleAddressChanged);

    const addressCustomerChanged = new ChangedAdressCustomerEvent({
      id: '123',
      name: 'Gustavo Lopes',
      address: 'rua x'
    })

    

    eventDispatcher.notify(addressCustomerChanged)
    expect(spychangedAddressCustomerEnvent).toHaveBeenCalled();
  });

});
