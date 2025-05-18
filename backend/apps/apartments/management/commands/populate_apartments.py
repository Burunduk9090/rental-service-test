import random
from django.core.management.base import BaseCommand
from apps.users.models import User
from apps.apartments.models import Apartment
from factory.django import DjangoModelFactory
import factory


class UserFactory(DjangoModelFactory):
    class Meta:
        model = User


    email = factory.Sequence(lambda n: f"{n}@example.com")
    password = factory.PostGenerationMethodCall('set_password', 'password123')


class ApartmentFactory(DjangoModelFactory):
    class Meta:
        model = Apartment

    name = factory.Sequence(lambda n: f"Apartment {n}")
    slug = factory.LazyAttribute(lambda obj: f"apartment-{obj.name.replace(' ', '-').lower()}")
    description = factory.Faker('text', max_nb_chars=200)
    price = factory.LazyAttribute(lambda _: round(random.uniform(500, 5000), 2))
    number_of_rooms = factory.LazyAttribute(lambda _: random.randint(1, 5))
    square = factory.LazyAttribute(lambda _: round(random.uniform(30, 150), 2))
    availability = factory.LazyAttribute(lambda _: random.choice([True, False]))
    owner = factory.SubFactory(UserFactory)


class Command(BaseCommand):
    help = "Заповнює базу даних автоматичними даними для користувачів і квартир"

    def add_arguments(self, parser):
        parser.add_argument(
            '--users',
            type=int,
            default=10,
            help='Кількість користувачів для створення (за замовчуванням: 10)',
        )
        parser.add_argument(
            '--apartments_per_user',
            type=int,
            default=5,
            help='Кількість квартир для кожного користувача (за замовчуванням: 5)',
        )

    def handle(self, *args, **options):
        users_count = options['users']
        apartments_per_user = options['apartments_per_user']

        # Створення користувачів
        users = UserFactory.create_batch(users_count)
        self.stdout.write(f"Створено {users_count} користувачів.")

        # Створення квартир
        total_apartments = 0
        for user in users:
            apartments = ApartmentFactory.create_batch(apartments_per_user, owner=user)
            total_apartments += len(apartments)

        self.stdout.write(f"Створено {total_apartments} квартир для користувачів.")
